using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.api.Dtos
{
    public class UserForRegisterDto
    {
        
        public string Gender { get; set; }
        
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength=4, ErrorMessage= "Password lenght should be between 4 and 8")]
        public string Password { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }

        [Required]
        public string DateOfBirth { get; set; }

        public DateTime LastActive { get; set; }

        public DateTime Created { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive= DateTime.Now;
        }
        
    }
}