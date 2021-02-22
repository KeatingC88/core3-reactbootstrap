using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;

using React_Bootstrap.Models;
using React_Bootstrap.Models.Authorization;

using FluentValidation;
using FluentValidation.AspNetCore;

using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;

namespace React_Bootstrap
{
    public class Startup
    {
        readonly string openOrigin = "openOrigin";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Identity with the default UI:
            services.AddDbContext<UsersContext>(options => options
                .UseInMemoryDatabase("UsersDB"));//Create UsersDB every load with InMemory Database.
            //Application Authentications
            services.AddDbContext<ApplicationDbContext>(options => options
                .UseInMemoryDatabase(Configuration.GetConnectionString("DefaultConnection")));//Call from AppSettings.json
            //Application User Context for Identity
            services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();
            /*
             * IdentityServer with an additional AddApiAuthorization helper method that sets up some default ASP.NET Core conventions on top of IdentityServer:
               This helper method configures IdentityServer to use our supported configuration. IdentityServer is a powerful and extensible framework for handling app security concerns. 
               At the same time, that exposes unnecessary complexity for the most common scenarios. Consequently, a set of conventions and 
               configuration options is provided to you that are considered a good starting point. 
               Once your authentication needs change, the full power of IdentityServer is still available to customize authentication to suit your needs.             
             */
            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            /*
             * Authentication with an additional AddIdentityServerJwt helper method that configures the app to validate JWT tokens produced by 
             * IdentityServer: This helper method configures a policy scheme for the app as the default authentication handler. 
             * The policy is configured to let Identity handle all requests routed to any subpath in the Identity URL space "/Identity". 
             * The JwtBearerHandler handles all other requests. Additionally, this method registers an <<ApplicationName>>API API resource with IdentityServer 
             * with a default scope of <<ApplicationName>>API and configures the JWT Bearer token middleware to validate tokens issued by IdentityServer for the app.*/
            services.AddAuthentication()
                .AddIdentityServerJwt();
            /*
            services.Configure<JwtBearerOptions>(IdentityServerJwtConstants.IdentityServerJwtBearerScheme, options =>
                {
                    Calls the original implementation provided by the API authorization support.
                    Run its own custom logic.
                });
            */
            //Allow CORS Policies Inject. (Currently ALL Open)
            services.AddCors(options =>
                {
                    options.AddPolicy(name: openOrigin,
                        builder =>
                        {
                            builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                        });
                });

            services.AddControllers();

            //Fluent Validation Inject and Swagger Inject Part 1 (see note in AddMVC).
            services.AddMvc(setupAction =>
            {
                //... mvc setup instructions here...
                //Note: SwashBuckle relies on the method "services.ADDMVC()"'s existence to automatically detect endpoints for Swagger.UI. Alternatives to this approach is found on the note here:https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-5.0&tabs=visual-studio
            }).AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<UserValidator>());

            
            //Swagger Inject Part 2.
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "My API",
                    Version = "v1"
                });//SwaggerDoc

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });//AddSecurityDefinition

                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                {
                    new OpenApiSecurityScheme
                    {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                    },
                    new string[] { }
                }
                });//AddSecurityRequirement

            });// Register the Swagger generator, defining 1 or more Swagger documents.
            
            //FluentValidation: UserValidator Inject.
            services.AddTransient<IValidator<User>, UserValidator>();
            
            services.AddControllersWithViews();
            services.AddRazorPages();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "view/build";
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSwagger();// Enable middleware to serve generated Swagger as a JSON endpoint.

            
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");//localhost:xxxx/swagger/v1/swagger.<html, js, css, json, etc...>
                //c.RoutePrefix = string.Empty; //To serve the Swagger UI at the app's root  localhost:xxxx
            });// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            

            app.UseRouting();
            //The authentication middleware that is responsible for validating the request credentials and setting the user on the request context:
            app.UseAuthentication();
            //The IdentityServer middleware that exposes the OpenID Connect endpoints:
            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseCors(openOrigin);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "view";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

        }
    }
}
