using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;
using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly TaskContext _context;

        public SeedController(TaskContext context)
        {
            _context = context;
        }

        //// GET: api/<SeedController>
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<ToDoTask>>> GetToDoTasks()
        //{
        //    const string fileName = @"SeedData.yml";

        //    var deserializer = new DeserializerBuilder()
        //         .Build();

        //    using var sr = System.IO.File.OpenText(fileName);
        //    List<ToDoTask> tasks = deserializer.Deserialize<List<ToDoTask>>(sr);

        //    foreach (var task in tasks)
        //    {
        //        task.Created = DateTime.UtcNow;
        //        _context.ToDoTasks.Add(task);
        //        await _context.SaveChangesAsync();

        //        Console.WriteLine(task);
        //    }

        //    return await _context.ToDoTasks.ToListAsync();
        //}

        // GET: api/<SeedController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskGroup>>> GetToDoTaskGroups()
        {
            const string fileName = @"SeedData.yml";

            var deserializer = new DeserializerBuilder()
                 .Build();

   

            using var sr = System.IO.File.OpenText(fileName);
            string fileContents = await System.IO.File.ReadAllTextAsync(fileName);


            // List<TaskGroup> taskGroup = deserializer.Deserialize<List<TaskGroup>>(sr);
            List<TaskGroup> taskGroup = deserializer.Deserialize<List<TaskGroup>>(fileContents);

            foreach (var taskg in taskGroup)
            {
                for(int i=0; i < taskg.TaskItems.Count; i++)  {
                    taskg.TaskItems.ElementAt(i).Created = DateTime.UtcNow;
                    if (i%2 == 0)
                    {
                        taskg.TaskItems.ElementAt(i).Planned = DateTime.UtcNow.AddDays(7);


                    }
                }
                _context.TaskGroups.Add(taskg);
                await _context.SaveChangesAsync();
            
            }

            return await _context.TaskGroups.ToListAsync();


        }
    }
}
