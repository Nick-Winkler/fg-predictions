namespace Api.Domain;

public class CurrentCondition
{
    public int Id { get; set; }

    public DateTimeOffset RecordedAt { get; set; }

    public int TemperatureC { get; set; }

    public string? Summary { get; set; }
}
