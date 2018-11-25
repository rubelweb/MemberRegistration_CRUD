using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Member_Registration.Data.Interfaces;
using Member_Registration.Data.Model;
using Member_Registration.Models;
using Microsoft.AspNetCore.Mvc;

namespace Member_Registration.Controllers
{
    public class HomeController : Controller
    {
        private readonly IMemberRepository _memberRepository;
        public HomeController(IMemberRepository MemberRepository)
        {
            _memberRepository = MemberRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllMembers()
        {
            return Json(_memberRepository.GetAll());
        }
        [HttpPost]
        public JsonResult AddMember(Member member)
        {
            try
            {
                _memberRepository.Create(member);
                return Json("Records added Successfully.");
            }
            catch
            {
                return Json("Records not added,");
            }
        }
        public JsonResult GetMemberbyID(int ID)
        {
            var member = _memberRepository.GetById(ID);
            return Json(member);
        }

        [HttpPost]
        public JsonResult UpdateMember(Member member)
        {
            _memberRepository.Update(member);
            return Json("Record updated successfully.");
        }

        [HttpPost]
        public JsonResult DeleteMember(int ID)
        {
            _memberRepository.Delete(ID);
            return Json("Record deleted successfully.");
        }
    }
}
