﻿using AppCore.Entites;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore.Interfaces
{
    public interface ITriviaRepository
    {
        List<TriviaQuestion> ListAll();
        List<TriviaQuestion> ListAllQuestions();
        List<TriviaQuestion> ListByCategory(string category);
        List<TriviaAnswer> GetAnswers(int id);
        TriviaQuestion GetById(int id);
        void Add(TriviaQuestion newQuestion);
        void Update(TriviaQuestion updatedQuestion);
        void Delete(TriviaQuestion deleteQuestion);
    }
}