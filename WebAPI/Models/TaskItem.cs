using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Xml.Serialization;
using WebAPI.Utlis;

namespace WebAPI.Models
{

    public class TaskItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string? Name { get; set; }
        [XmlIgnore()]
        public DateTime? Created { get; set; }

        [XmlIgnore()]
        public DateTime? Planned { get; set; }
        public ItemStatus Status { get; set; }

        public ItemPriority Priority { get; set; }

        // Foreign Key
        public long TaskGroupId { get; set; }

        //[JsonIgnore]
        //public TaskGroup TaskGroup { get; set; } = null;


    }
}
