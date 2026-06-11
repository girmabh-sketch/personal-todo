//using LinqToDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskGroupsController : ControllerBase
    {

        private readonly TaskContext _context;

        public TaskGroupsController(TaskContext context)
        {
            _context = context;
        }


        // GET: api/TaskGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskGroup>>> GetTaskGroups()
        {
            return await _context.TaskGroups.Include(t => t.TaskItems).ToListAsync();
        }


        // GET: api/TaskGroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskGroup>> GetTaskGroup(long id)
        {
            var taskGroup = await _context.TaskGroups.FindAsync(id);

            if (taskGroup == null)
            {
                return NotFound();
            }

            return taskGroup;
        }

        // PUT: api/TaskGroups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskGroup(long id, TaskGroup taskGroup)
        {
            if (id != taskGroup.Id)
            {
                return BadRequest();
            }

            _context.Entry(taskGroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskGroupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TaskGroups
        [HttpPost]
        public async Task<ActionResult<TaskGroup>> PostTaskGroup(TaskGroup taskGroup)
        {
            Console.WriteLine("Post api/taskitems");
            _context.TaskGroups.Add(taskGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskGroup", new { id = taskGroup.Id }, taskGroup);
        }

        // DELETE: api/TaskGroups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskGroup(long id)
        {
            var taskGroup = await _context.TaskGroups.FindAsync(id);
            if (taskGroup == null)
            {
                return NotFound();
            }

            _context.TaskGroups.Remove(taskGroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskGroupExists(long id)
        {
            return _context.TaskGroups.Any(e => e.Id == id);
        }

    }
}
