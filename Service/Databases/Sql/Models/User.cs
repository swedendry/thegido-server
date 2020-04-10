using Service.Databases.Sql.Core;
using System.ComponentModel.DataAnnotations;

namespace Service.Databases.Sql.Models
{
    public class User : IEntity
    {
        [Key]
        [MaxLength(60)]
        public string Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }
    }

    public class UserViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
