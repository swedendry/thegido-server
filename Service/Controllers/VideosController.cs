using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Service.Databases.Sql;
using Service.Databases.Sql.Models;
using Service.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Controllers
{
    [Route("api/videos")]
    public class VideosController : Controller
    {
        private readonly IServerUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VideosController(
            IServerUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var entries = await _unitOfWork.Videos.GetManyAsync();
                if (entries == null)
                    return Payloader.Fail(PayloadCode.DbNull);

                return Payloader.Success(_mapper.Map<IEnumerable<VideoViewModel>>(entries));
            }
            catch (Exception ex)
            {
                return Payloader.Error(ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var entity = await _unitOfWork.Videos.GetAsync(u => u.Id == id);
                if (entity == null)
                    return Payloader.Fail(PayloadCode.DbNull);

                return Payloader.Success(_mapper.Map<VideoViewModel>(entity));
            }
            catch (Exception ex)
            {
                return Payloader.Error(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]VideoViewModel body)
        {
            try
            {
                var entity = await _unitOfWork.Videos.GetAsync(u => u.Id == body.Id);
                if (entity != null)
                    return Payloader.Fail(PayloadCode.Duplication);

                var newEntity = new Video
                {
                    Title = body.Title,
                    Uri = body.Uri,
                };

                await _unitOfWork.Videos.AddAsync(newEntity);
                await _unitOfWork.CommitAsync();

                return Payloader.Success(_mapper.Map<VideoViewModel>(newEntity));
            }
            catch (Exception ex)
            {
                return Payloader.Error(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]VideoViewModel body)
        {
            try
            {
                var entity = await _unitOfWork.Videos.GetAsync(u => u.Id == id, isTracking: true);
                if (entity == null)
                    return Payloader.Fail(PayloadCode.DbNull);

                entity.Title = body.Title;
                entity.Uri = body.Uri;

                await _unitOfWork.CommitAsync();

                return Payloader.Success(_mapper.Map<VideoViewModel>(entity));
            }
            catch (Exception ex)
            {
                return Payloader.Error(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var entity = await _unitOfWork.Videos.GetAsync(u => u.Id == id);
                if (entity == null)
                    return Payloader.Fail(PayloadCode.DbNull);

                await _unitOfWork.Videos.DeleteAsync(entity);
                await _unitOfWork.CommitAsync();

                return Payloader.Success(id);
            }
            catch (Exception ex)
            {
                return Payloader.Error(ex);
            }
        }
    }
}
