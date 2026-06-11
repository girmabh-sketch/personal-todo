using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Utlis;

namespace WebAPI.Models
{

    public class TaskGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public ItemType Type { get; set; }

        // Navigation properties
        public virtual ICollection<TaskItem> TaskItems { get; set; } = new List<TaskItem>();
       

    }
}
