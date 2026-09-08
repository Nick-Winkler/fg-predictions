namespace Api.Features.Conditions;

internal static class ConditionsApi
{
    public const string BasePath = "/api/conditions";

    public static RouteGroupBuilder MapConditionsApi(this IEndpointRouteBuilder app) =>
        app.MapGroup(BasePath).WithTags("Current Conditions");
}
