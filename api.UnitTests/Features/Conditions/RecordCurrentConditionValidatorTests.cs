using Api.Features.Conditions;
using FluentValidation.TestHelper;

namespace Api.UnitTests.Features.Conditions;

public class RecordCurrentConditionValidatorTests
{
    private readonly RecordCurrentCondition.Validator _validator = new();

    [Theory]
    [InlineData(-100)]
    [InlineData(0)]
    [InlineData(100)]
    public void Accepts_temperature_within_range(int temperatureC)
    {
        var result = _validator.TestValidate(new RecordCurrentCondition.Request(temperatureC, "Mild"));

        result.ShouldNotHaveValidationErrorFor(x => x.TemperatureC);
    }

    [Theory]
    [InlineData(-101)]
    [InlineData(101)]
    public void Rejects_temperature_out_of_range(int temperatureC)
    {
        var result = _validator.TestValidate(new RecordCurrentCondition.Request(temperatureC, null));

        result.ShouldHaveValidationErrorFor(x => x.TemperatureC);
    }

    [Fact]
    public void Rejects_summary_over_max_length()
    {
        var request = new RecordCurrentCondition.Request(20, new string('x', 101));

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Summary);
    }

    [Fact]
    public void Accepts_null_summary()
    {
        var result = _validator.TestValidate(new RecordCurrentCondition.Request(20, null));

        result.ShouldNotHaveValidationErrorFor(x => x.Summary);
    }
}
