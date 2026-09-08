using System.Net;
using System.Net.Http.Json;
using Api.Features.Conditions;
using Microsoft.AspNetCore.Http;

namespace Api.IntegrationTests.Features.Conditions;

public class ConditionsEndpointsTests(ApiFactory factory) : IntegrationTestBase(factory)
{
    private const string Endpoint = "/api/conditions";

    [Fact]
    public async Task Post_valid_condition_returns_201_and_persists_it()
    {
        var response = await Client.PostAsJsonAsync(Endpoint, new { temperatureC = 21, summary = "Mild" });

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var created = await response.Content.ReadFromJsonAsync<RecordCurrentCondition.Response>();
        Assert.NotNull(created);
        Assert.True(created.Id > 0);
        Assert.Equal(21, created.TemperatureC);

        var list = await Client.GetFromJsonAsync<GetCurrentConditions.Response[]>(Endpoint);
        Assert.NotNull(list);
        Assert.Contains(list, c => c.Id == created.Id && c.Summary == "Mild");
    }

    [Fact]
    public async Task Post_out_of_range_temperature_returns_400()
    {
        var response = await Client.PostAsJsonAsync(Endpoint, new { temperatureC = 999, summary = (string?)null });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);

        var problem = await response.Content.ReadFromJsonAsync<HttpValidationProblemDetails>();
        Assert.NotNull(problem);
        Assert.Contains("TemperatureC", problem.Errors.Keys);
    }

    [Fact]
    public async Task Get_conditions_returns_at_most_five_newest_first()
    {
        for (var i = 0; i < 6; i++)
        {
            await Client.PostAsJsonAsync(Endpoint, new { temperatureC = i, summary = $"reading {i}" });
        }

        var list = await Client.GetFromJsonAsync<GetCurrentConditions.Response[]>(Endpoint);

        Assert.NotNull(list);
        Assert.True(list.Length <= 5);
    }
}
