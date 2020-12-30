using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

using ServerRestAPI.Models;

using FluentValidation;
using FluentValidation.AspNetCore;

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

            //Swagger Inject Part 2.
            services.AddSwaggerGen();// Register the Swagger generator, defining 1 or more Swagger documents.

            //FluentValidation: UserValidator Inject.
            services.AddTransient<IValidator<User>, UserValidator>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseSwagger();// Enable middleware to serve generated Swagger as a JSON endpoint.

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");//localhost:xxxx/swagger/v1/swagger.<html, js, css, json, etc...>
                c.RoutePrefix = string.Empty; //To serve the Swagger UI at the app's root  localhost:xxxx
            });// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.

            app.UseRouting();

            app.UseCors(openOrigin);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
