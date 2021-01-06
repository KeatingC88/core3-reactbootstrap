using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FluentValidation;


namespace React_Bootstrap.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public bool Admin { get; set; }
        public bool Active { get; set; }

    }

    public class UserValidator : AbstractValidator<User> {
        public UserValidator() {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.Email).NotNull().EmailAddress().MaximumLength(70);
            RuleFor(x => x.Admin).NotNull();
            RuleFor(x => x.Active).NotNull();
        }
    }
}
