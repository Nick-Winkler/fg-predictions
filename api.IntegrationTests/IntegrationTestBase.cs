namespace Api.IntegrationTests;

public abstract class IntegrationTestBase(ApiFactory factory) : IClassFixture<ApiFactory>, IAsyncLifetime
{
    protected ApiFactory Factory { get; } = factory;

    protected HttpClient Client { get; } = factory.CreateClient();

    public Task InitializeAsync() => Task.CompletedTask;

    public Task DisposeAsync() => Factory.ResetDatabaseAsync();
}
