using Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace Api.Infrastructure;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<CurrentCondition> CurrentConditions => Set<CurrentCondition>();
}
