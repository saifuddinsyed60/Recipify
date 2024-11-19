using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock)
        : base(options, logger, encoder, clock)
    {
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey("Authorization"))
        {
            return AuthenticateResult.Fail("Missing Authorization Header");
        }

        string email = String.Empty;
        string username = String.Empty;
        string password = String.Empty;
        string base64Credentials;
        string hashCreds = String.Empty;
        try
        {
            var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
            var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
            base64Credentials = credentialBytes.ToString();
            var credentials = System.Text.Encoding.UTF8.GetString(credentialBytes).Split(':');
            email = credentials[0];
            username = email.Split('@')[0];
            password = credentials[1];
        }
        catch
        {
            return AuthenticateResult.Fail("Error decrypting login");
        }

        using (var db = new recipeContext())
        {
            var u = db.Users.FirstOrDefault(l => l.username == username);
            if (u == null)
            {
                return await Task.FromResult(AuthenticateResult.Fail("Invalid username"));
            }

            using (var hmac = new HMACSHA256())
            {
                hmac.Key = u.salt;
                var passwordBytes = Encoding.UTF8.GetBytes(password);
                var hashBytes = hmac.ComputeHash(passwordBytes);
                if (u.password == Convert.ToBase64String(hashBytes))
                {

                    var claims = new System.Security.Claims.Claim[]{
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, username)
            };
                    var identity = new System.Security.Claims.ClaimsIdentity(claims, Scheme.Name);
                    var principal = new System.Security.Claims.ClaimsPrincipal(identity);
                    var ticket = new AuthenticationTicket(principal, Scheme.Name);
                    return AuthenticateResult.Success(ticket);
                }
                else
                {
                    return AuthenticateResult.Fail("Invalid username/password");
                }
            }



        }
    }
}