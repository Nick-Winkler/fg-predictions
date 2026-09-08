namespace Api.Features.Forecasts;

internal static class ForecastsApi
{
    public static RouteGroupBuilder MapForecastsApi(this IEndpointRouteBuilder app) =>
        app.MapGroup("/api/forecasts").WithTags("Forecasts");
}
