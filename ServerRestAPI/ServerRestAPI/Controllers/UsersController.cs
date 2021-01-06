using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Bootstrap.Models;
using Microsoft.AspNetCore.Authorization;

namespace React_Bootstrap.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersContext _context;

        public UsersController(UsersContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersDTO>>> GetUsers()
        {
            return await _context.Users.Select(x => UserToDTO(x)).ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsersDTO>> GetUser(long id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return UserToDTO(user);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(long id, UsersDTO usersDTO)
        {
            if (id != usersDTO.Id)
            {
                return BadRequest();
            } 

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Id = usersDTO.Id;
            user.Email = usersDTO.Email;
            user.Admin = usersDTO.Admin;
            user.Active = usersDTO.Active;

            var validator = new UserValidator();
            var validationResult = validator.Validate(user);//This is basically checking for the email validation only.
            validationResult.AddToModelState(ModelState, null);

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }//If Email is invalid it will stop here...

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!UserExists(id))
            {
                return NotFound();
            }
            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<UsersDTO>> CreateUser(UsersDTO usersDTO)
        {
            var user = new User
            {
                Id = usersDTO.Id,
                Email = usersDTO.Email,
                Admin = usersDTO.Admin,
                Active = usersDTO.Active,
            };//User Object

            var validator = new UserValidator();
            var validationResult = validator.Validate(user);//This is basically checking for the email validation only.
            validationResult.AddToModelState(ModelState, null);

            if (! ModelState.IsValid) {
                return BadRequest();
            }
            
            _context.Users.Add(user);//When email is valid -- save it.
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, UserToDTO(user));
        }

        // DELETE: api/Users/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(long id) =>
            _context.Users.Any(e => e.Id == id);

        private static UsersDTO UserToDTO(User user) => new UsersDTO
        {
            Id = user.Id,
            Email = user.Email,
            Admin = user.Admin,
            Active = user.Active
        };
    }
}
