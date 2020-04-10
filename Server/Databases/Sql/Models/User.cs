using Server.Databases.Sql.Core;
using System.ComponentModel.DataAnnotations;

namespace Server.Databases.Sql.Models
{
    public class User : IEntity
    {
        [Key]
        [MaxLength(60)]
        public string Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        [Required]
        public ulong Money { get; set; }
    }

    public class UserViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ulong Money { get; set; }
    }
}
