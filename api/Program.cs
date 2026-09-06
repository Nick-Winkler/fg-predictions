using Api.Endpoints;
using Microsoft.AspNetCore.OpenApi;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpoints();
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
