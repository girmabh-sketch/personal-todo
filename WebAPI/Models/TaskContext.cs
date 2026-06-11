using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace WebAPI.Models
{

    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options)
            : base(options)
        {
        }

        public DbSet<TaskItem> TaskItems{ get; set; } = null!;

        public DbSet<TaskGroup> TaskGroups { get; set; } = null!;

    

    }
}
