﻿using AppCore.Entites;
using Microsoft.EntityFrameworkCore;

namespace NotTriviaCrack.Data
{
    public class NotTriviaCrackContext : DbContext
    {
        public NotTriviaCrackContext(DbContextOptions<NotTriviaCrackContext> options)
            : base(options)
        {
        }

        public DbSet<TriviaQuestion> Questions {get; set;}
        public DbSet<TriviaAnswer> Answers { get; set; }
    }
}
