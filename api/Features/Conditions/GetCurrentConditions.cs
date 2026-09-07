using Api.Endpoints;
using Api.Infrastructure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Conditions;

public static class GetCurrentConditions
{
    private const int Limit = 5;

    public record Response(int Id, DateTimeOffset RecordedAt, int TemperatureC, string? Summary);

    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapConditionsApi().MapGet("", Handler);
        }
    }

    private static async Task<Ok<IReadOnlyList<Response>>> Handler(ApplicationDbContext context)
    {
        IReadOnlyList<Response> conditions = await context.CurrentConditions
            .OrderByDescending(condition => condition.RecordedAt)
            .ThenByDescending(condition => condition.Id)
            .Take(Limit)
            .Select(condition => new Response(
                condition.Id, condition.RecordedAt, condition.TemperatureC, condition.Summary))
            .ToListAsync();

        return TypedResults.Ok(conditions);
    }
}
