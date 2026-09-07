using Api.Domain;
using Api.Endpoints;
using Api.Infrastructure;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Api.Features.Conditions;

public static class RecordCurrentCondition
{
    public record Request(int TemperatureC, string? Summary);

    public record Response(int Id, DateTimeOffset RecordedAt, int TemperatureC, string? Summary);

    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapConditionsApi().MapPost("", Handler);
        }
    }

    private static async Task<Results<Created<Response>, BadRequest>> Handler(
        Request request, ApplicationDbContext context)
    {
        var condition = new CurrentCondition
        {
            // Must be UtcNow, not Now: Npgsql writes DateTimeOffset to timestamptz only with
            // Offset=0, and throws ArgumentException on anything else.
            // https://www.npgsql.org/doc/types/datetime.html#timestamps-and-timezones
            RecordedAt = DateTimeOffset.UtcNow,
            TemperatureC = request.TemperatureC,
            Summary = request.Summary,
        };

        context.CurrentConditions.Add(condition);

        await context.SaveChangesAsync();

        var response = new Response(
            condition.Id, condition.RecordedAt, condition.TemperatureC, condition.Summary);

        return TypedResults.Created($"{ConditionsApi.BasePath}/{condition.Id}", response);
    }
}
