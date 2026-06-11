using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;
using System;
using System.Configuration;
using System.Text.Json.Serialization;
using WebAPI;
using WebAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//builder.Services.AddControllers().AddJsonOptions(options =>
//{
//    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
//});

builder.Services.AddControllers();
//builder.Services.AddDbContext<ToDoContext>(static opt =>
//    opt.UseInMemoryDatabase("ToDoList"));
builder.Services.AddDbContext<TaskContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

const string MyAllowAnyOrigins = "_myAllowAnyOrigins";

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowAnyOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(
//        policy =>
//        {
//            policy.AllowAnyOrigin()
//            .AllowAnyHeader()
//            .AllowAnyMethod();
//        });
//});


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<TaskContext>();
    var canConnect = await dbContext.Database.CanConnectAsync();
    app.Logger.LogInformation("Can connect to database: {CanConnect}", canConnect);
    if (!dbContext.Database.GetService<IRelationalDatabaseCreator>().Exists())
    {
        Console.WriteLine("Database Check");
        app.Logger.LogInformation("Migration");
        // Create the Db if it doesn't exist and applies any pending migration.
        //dbContext.Database.Migrate();

        }
    dbContext.Database.Migrate();
}



   



//using (var scope = app.Services.CreateScope())
//{
//    var db = scope.ServiceProvider.GetRequiredService<ToDoTaskContext>();
//    var canConnect = await db.Database.CanConnectAsync();
//    app.Logger.LogInformation("Can connect to database: {CanConnect}", canConnect);
//    // To create database from the code

//        db.Database.Migrate();
    
  
//}

//DatabaseInitilaizer.Seed(app);

//await using var scope = app.Services.CreateAsyncScope();
//var db = scope.ServiceProvider.GetRequiredService<ToDoContext>();
//var canConnect = await db.Database.CanConnectAsync();
//app.Logger.LogInformation("Can connect to database: {CanConnect}", canConnect);


// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}



app.UseHttpsRedirection();
// Use CORS policy
//app.UseCors();
app.UseCors(MyAllowAnyOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
