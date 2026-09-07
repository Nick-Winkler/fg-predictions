using Api.Endpoints;
using Api.Infrastructure;
using FluentValidation;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddEndpoints();
builder.Services.ConfigureHttpJsonOptions(options =>
    options.SerializerOptions.NumberHandling = JsonNumberHandling.Strict);
builder.Services.AddOpenApi(options =>
{
    // Handle per-slice nested DTOs so GetForecasts.Response -> "GetForecastsResponse"
    // instead of every slice's Request/Response colliding into one schema.
    options.CreateSchemaReferenceId = type => type.Type.DeclaringType is { } declaring
        ? $"{declaring.Name}{type.Type.Name}"
        : OpenApiOptions.CreateDefaultSchemaReferenceId(type);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.MapEndpoints();

app.Run();
