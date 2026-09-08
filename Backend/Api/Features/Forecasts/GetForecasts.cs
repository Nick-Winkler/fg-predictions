using Api.Endpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Api.Features.Forecasts;

public static class GetForecasts
{
    public record Response(DateOnly Date, int TemperatureC, int TemperatureF, string? Summary);

    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapForecastsApi().MapGet("", Handler);
        }
    }

    private static readonly string[] Summaries =
    [
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    ];

    private static Ok<IReadOnlyList<Response>> Handler()
    {
        IReadOnlyList<Response> forecasts = Enumerable.Range(1, 5)
            .Select(index =>
            {
                var temperatureC = Random.Shared.Next(-20, 55);

                return new Response(
                    DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    temperatureC,
                    32 + (int)(temperatureC / 0.5556),
                    Summaries[Random.Shared.Next(Summaries.Length)]);
            })
            .ToArray();

        return TypedResults.Ok(forecasts);
    }
}
