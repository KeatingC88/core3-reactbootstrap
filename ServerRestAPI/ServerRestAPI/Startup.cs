using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;

using ServerRestAPI.Models;
using ServerRestAPI.Models.Authorization;

using FluentValidation;
using FluentValidation.AspNetCore;

using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

namespace ServerRestAPI
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
            //Inmemory Database Context Inject.
            services.AddDbContext<UsersContext>(opt =>
                opt.UseInMemoryDatabase("UsersDB"));

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

            /*
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
            */
            //FluentValidation: UserValidator Inject.
            services.AddTransient<IValidator<User>, UserValidator>();

            //Application Authentications
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));

            services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddControllersWithViews();
            services.AddRazorPages();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
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

            //app.UseSwagger();// Enable middleware to serve generated Swagger as a JSON endpoint.

            /*
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");//localhost:xxxx/swagger/v1/swagger.<html, js, css, json, etc...>
                c.RoutePrefix = string.Empty; //To serve the Swagger UI at the app's root  localhost:xxxx
            });// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            */

            app.UseRouting();
            
            app.UseAuthentication();
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
                spa.Options.SourcePath = "../reactbs/view";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
