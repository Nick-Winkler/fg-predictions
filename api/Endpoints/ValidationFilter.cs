using FluentValidation;

namespace Api.Endpoints;

public sealed class ValidationFilter<TRequest>(IValidator<TRequest> validator)
    : IEndpointFilter where TRequest : class
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        if (context.Arguments.OfType<TRequest>().FirstOrDefault() is not { } request)
        {
            return TypedResults.BadRequest();
        }

        var result = await validator.ValidateAsync(request, context.HttpContext.RequestAborted);
        if (!result.IsValid)
        {
            return TypedResults.ValidationProblem(result.ToDictionary());
        }

        return await next(context);
    }
}

public static class ValidationFilterExtensions
{
    public static RouteHandlerBuilder WithValidation<TRequest>(this RouteHandlerBuilder builder)
        where TRequest : class
    {
        builder.AddEndpointFilter<ValidationFilter<TRequest>>();
        builder.ProducesValidationProblem();
        return builder;
    }
}
