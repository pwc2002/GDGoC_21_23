"use client";

import { useRef, useState, useEffect } from 'react';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import koLocale from '@fullcalendar/core/locales/ko';
import {Divider} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Accordion, AccordionItem} from "@nextui-org/react";

export default function FullCalendar() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const calendarRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState();

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchDuration = Date.now() - touchStartTime.current;

    if (touchDuration < 200) {
      const calendarApi = calendarRef.current.getApi();

      if (touchStartX.current - touchEndX > 50) {
        // 왼쪽으로 스와이프하면 다음 달로 이동
        calendarApi.next();
      } else if (touchEndX - touchStartX.current > 50) {
        // 오른쪽으로 스와이프하면 이전 달로 이동
        calendarApi.prev();
      }
    }
  };

  const handleDatesSet = (arg) => {
    console.log(arg);
    const startDate = new Date(arg.start).getMonth()+1;
    let endDate = new Date(arg.end).getMonth()+1;
    if(startDate > endDate){
      endDate += 12;
    }
    let newMonth = 0;
    if(endDate - startDate > 1){
      newMonth = (startDate+1) % 12;
    } else {
      newMonth = startDate % 12;
    }

    if(newMonth === 0){
      newMonth = 12;
    }
    
    setCurrentMonth(newMonth);
    console.log(endDate, startDate, newMonth);

  };

  const handleDayCellClick = (date) => {
    onOpen();
  };

const handleEventDragStop = () => {
  console.log("timer start");
  setTimeout(() => {
    const daydivs = document.getElementsByClassName("fc-daygrid-day-frame");
    const plandivs = document.getElementsByClassName("fc-daygrid-event-harness");
    console.log("daydivs", daydivs);
    console.log("plandivs", plandivs);

    // 첫 번째 div 안의 a 태그에서 aria-label 속성의 날짜를 가져옴
    const firstDayDiv = daydivs[0];

    for (let i = 0; i < plandivs.length; i++) {
      console.log("plandivs[i]", plandivs[i]);
      plandivs[i].addEventListener('click', (event) => {
        const divStartX = plandivs[i].getBoundingClientRect().left;
        const clickX = event.clientX;
        const diffX = clickX - divStartX;
        
        const anchorTag = plandivs[i].querySelector('a');
        console.log("anchorTag", anchorTag);
        let previousSiblingDiv = plandivs[i].parentElement.previousElementSibling;
        while (previousSiblingDiv && !previousSiblingDiv.querySelector('a')) {
          previousSiblingDiv = previousSiblingDiv.previousElementSibling;
        }
        const previousAnchorTag = previousSiblingDiv ? previousSiblingDiv.querySelector('a') : null;
        console.log("previousAnchorTag", previousAnchorTag);
        const ariaLabel = previousAnchorTag ? previousAnchorTag.getAttribute('aria-label') : anchorTag.getAttribute('aria-label');
        console.log("ariaLabel", ariaLabel);
        const [year, month, day] = ariaLabel.match(/(\d+)년 (\d+)월 (\d+)일/).slice(1, 4);
        console.log("year, month, day", year, month, day);
        const baseDate = new Date(year, month - 1, day);
        console.log("baseDate", baseDate);

        const dayDivStartX = daydivs[0].getBoundingClientRect().left;
        const dayWidth = daydivs[0].getBoundingClientRect().width;
        console.log("dayWidth", dayWidth);

        const test = Math.floor(diffX / dayWidth);
        console.log("test", test);

        console.log("div 시작점:", divStartX);
        console.log("클릭된 x좌표:", clickX);
        console.log("차이값:", diffX);
        const newDate = new Date(baseDate);
        newDate.setDate(newDate.getDate() + test);
        console.log("새로운 날짜:", newDate);
        setSelectedDate(newDate);
        onOpen();
      });
    }
  }, 0);
};

  const handleEventResizeStop = (info) => {
    setTimeout(() => {
      console.log('Event resized:', info.event);
      const daydiv = info.el.getElementsByClassName("fc-daygrid-day-frame")[0];
      const plandivs = info.el.getElementsByClassName("fc-daygrid-event-harness");
      console.log("daydiv", daydiv);
      console.log("plandivs", plandivs);
      console.log("이엘", info);

      for (let i = 0; i < plandivs.length; i++) {
        console.log("plandivs[i]", plandivs[i]);
        plandivs[i].addEventListener('click', (event) => {
          const divStartX = plandivs[i].getBoundingClientRect().left;
          const clickX = event.clientX;
          const diffX = clickX - divStartX;

          const dayDivStartX = daydiv.getBoundingClientRect().left;
          const dayWidth = daydiv.getBoundingClientRect().width;
          console.log("dayWidth", dayWidth);

          const test = Math.floor(diffX / dayWidth);
          console.log("test", test);

          console.log("div 시작점:", divStartX);
          console.log("클릭된 x좌표:", clickX);
          console.log("차이값:", diffX);
          const newDate = new Date(info.date);
          newDate.setDate(newDate.getDate() + test);
          console.log("새로운 날짜:", newDate);
          setSelectedDate(newDate);
          onOpen();
        });
      }
    }, 0);
  };

  const events = [
    { title: '개인일정', start: '2024-11-04', resourceId: 'e'},
    { title: '개인일정', start: '2024-11-04', end: '2024-11-07', resourceId: 'e'},
    { title: '학사일정', start: '2024-11-08', end: '2024-11-10', resourceId: 'c'},
    { title: '성장형 후배 드림 장학기금 장학생 선발 안내', start: '2024-11-11', end: '2024-11-26', resourceId: 'b'},
    { title: '장학사정관제 장학금 선발 안내', start: '2024-11-12', end: '2024-11-23', resourceId: 'd'},
    { title: '학사일정', start: '2024-11-12', end: '2024-11-15', resourceId: 'c'},
    { title: '학사일정', start: '2024-11-11', end: '2024-11-14', resourceId: 'a'},
    { title: '개인일정', start: '2024-11-11', end: '2024-11-13', resourceId: 'e'},
    { title: '개인일정', start: '2024-11-21', resourceId: 'e'},
    { title: '개인일정', start: '2024-11-24', end: '2024-11-26', resourceId: 'e'},
    { title: '개인일정', start: '2024-11-27', end: '2024-11-30', resourceId: 'e'},
  ];

  return (
    <>
    <div
      className='w-full h-full'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Calendar
        ref={calendarRef}
        locale={koLocale}
        height='100%'
        plugins={[
          resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin
        ]}
        headerToolbar={{
          left: 'title',
          center: '',
          right: ''
        }}
        titleFormat={{ month: 'long' }}
        initialView='dayGridMonth'
        nowIndicator={true}
        editable={true}
        selectable={true}
        dayMaxEvents={false}
        selectMirror={true}
        resources={[
          { id: 'a', title: 'Auditorium A', eventColor: '#EA4335' },
          { id: 'b', title: 'Auditorium B', eventColor: '#F9AB00' },
          { id: 'c', title: 'Auditorium C', eventColor: '#34A853' },
          { id: 'd', title: 'Auditorium D', eventColor: '#2485F4' },
          { id: 'e', title: 'Auditorium E', eventColor: '#888888' },
        ]}
        initialEvents={events}
        dayCellContent={(arg) => {
          arg.dayNumberText = arg.dayNumberText.replace('일', '');
          return <p className='font-bold text-xl istext'>{arg.dayNumberText}</p>;
        }}
        dayCellClassNames={(arg) => {
          const today = new Date();
          const isToday = arg.date.toDateString() === today.toDateString();
          const isCurrentMonth = arg.date.getMonth()+1 === currentMonth;

          if (isToday) {
            return ['today-black'];
          } else if (isCurrentMonth) {
            return ['current-month-gray'];
          } else {
            return ['other-month-hidden'];
          }
        }}
        datesSet={handleDatesSet}
        dayCellDidMount={(info) => {
          setTimeout(() => {
            const daydiv = info.el.getElementsByClassName("fc-daygrid-day-frame")[0];
            const plandivs = info.el.getElementsByClassName("fc-daygrid-event-harness");
            console.log("daydiv", daydiv);
            console.log("plandivs", plandivs);
            console.log("이엘", info);

            for (let i = 0; i < plandivs.length; i++) {
              console.log("plandivs[i]", plandivs[i]);
              plandivs[i].addEventListener('click', (event) => {
                const divStartX = plandivs[i].getBoundingClientRect().left;
                const clickX = event.clientX;
                const diffX = clickX - divStartX;

                
                const dayDivStartX = daydiv.getBoundingClientRect().left;
                const dayWidth = daydiv.getBoundingClientRect().width;
                console.log("dayWidth", dayWidth);
                
                const test = Math.floor(diffX / dayWidth);
                console.log("test", test);

                console.log("div 시작점:", divStartX);
                console.log("클릭된 x좌표:", clickX);
                console.log("차이값:", diffX);
                const newDate = new Date(info.date);
                newDate.setDate(newDate.getDate() + test);
                console.log("새로운 날짜:", newDate);
                setSelectedDate(newDate);
                onOpen();
              });
            }
          }, 0); 
        }}
        eventDragStop={handleEventDragStop}
        eventResizeStop={handleEventDragStop}
      />
    </div>
    <Modal 
        isOpen={isOpen} 
        placement='center'
        size="sm"
        onOpenChange={onOpenChange}
        className='mx-7 bg-[#f5f5f5] h-[85%]'
        scrollBehavior='inside'
        classNames={{
          closeButton: 'pt-6 pr-6',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col pt-6'>
                <p className='text-xl font-bold'>{`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`}</p>
              </ModalHeader>
              <ModalBody className='gap-0 mt-5'>
                <div className='flex flex-col'>
                  <p className='text-sm mb-[10px] font-bold text-[#888888]'>학사일정</p>
                  <Accordion variant="splitted"
                  className='px-0'
                  >
                    <AccordionItem 
                    classNames={{title: 'font-bold text-xl', content: 'font-bold text-base text-[#888888]'}} 
                    key="1" 
                    aria-label="Accordion 1" 
                    title="2024학년도 2학기 성장현 후배드림 장학기금 장학생 선발 안내"
                    >
                       가. 선발 대상 : 가정형편이 어려운 환경 속에 본인의 꿈을 잃지 않으며 평소 생활태도가 성실하고 꿈과 비전에 대한 실현의지가 확고한 재학생
                        <br/>나. 제출 서류 : 진로계획서(자유양식), 성적증명서, 가계곤란 증빙서류(학자금지원구간 통지서)
                        <br/>다. 선발 인원 : 학기당 1명
                        (각 대학별 1명씩, 매학기 신규 선발)
                          라. 장학 금액 : 학기당 100만원/명
                        <br/>마. 제출 기한 : 11. 25. (월)
                        <br/>바. 제출 방법 : 스캔본 이메일 제출 : yujin@inha.ac.kr 
                        <br/>
                        <a href="https://cse.inha.ac.kr/cse/888/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGY3NlJTJGMjQyJTJGMTM5NTk4JTJGYXJ0Y2xWaWV3LmRvJTNGcGFnZSUzRDElMjZzcmNoQ29sdW1uJTNEJTI2c3JjaFdyZCUzRCUyNmJic0NsU2VxJTNEJTI2YmJzT3BlbldyZFNlcSUzRCUyNnJnc0JnbmRlU3RyJTNEJTI2cmdzRW5kZGVTdHIlM0QlMjZpc1ZpZXdNaW5lJTNEZmFsc2UlMjZwYXNzd29yZCUzRCUyNg%3D%3D" className='text-[#2485F4]'>자세히 보기</a>
                    </AccordionItem>
                    <AccordionItem key="2" 
                    classNames={{title: 'font-bold text-xl', content: 'font-bold text-base text-[#888888]'}} 
                    aria-label="Accordion 2" title="2024학년도 동계 학부연구생 모집 안내">
                    2024학년도 동계 학부연구생 모집 안내
                    </AccordionItem>
                    <AccordionItem key="3"
                    classNames={{title: 'font-bold text-xl', content: 'font-bold text-base text-[#888888]'}} 
                    aria-label="Accordion 3" title="학과별 재학생 대상 전공능력진단 실시 안내">
                    학과별 재학생 대상 전공능력진단 실시 안내
                    </AccordionItem>
                  </Accordion>
                  <Divider className='my-5'/>
                  <p className='text-sm mb-[10px] font-bold text-[#888888]'>개인일정</p>
                  <Accordion variant="splitted"
                  className='px-0'
                  >
                    <AccordionItem key="2" 
                    classNames={{title: 'font-bold text-xl', content: 'font-bold text-base text-[#888888]'}} 
                    aria-label="Accordion 2" title="데이트💗">
                    2024학년도 동계 학부연구생 모집 안내
                    </AccordionItem>
                    <AccordionItem key="3" 
                    classNames={{title: 'font-bold text-xl', content: 'font-bold text-base text-[#888888]'}} 
                    aria-label="Accordion 3" title="동아리 회의">
                    학과별 재학생 대상 전공능력진단 실시 안내
                    </AccordionItem>
                  </Accordion>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
