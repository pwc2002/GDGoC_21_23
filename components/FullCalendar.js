"use client";

import { useRef, useState, useEffect } from 'react';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import koLocale from '@fullcalendar/core/locales/ko';
import {Divider} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Accordion, AccordionItem, Input} from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";

export default function FullCalendar() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const calendarRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const hasRequiredFields = startDate && endDate && title.trim() !== "";
    const isDateValid = startDate && endDate ? 
      new Date(startDate) <= new Date(endDate) : true;

    setDateError(!isDateValid && startDate && endDate);
    setIsValid(hasRequiredFields && isDateValid);
  }, [startDate, endDate, title]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/myplan', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const processedEvents = data.myplan.map(event => ({
          ...event,
          start: new Date(event.startdate).toISOString().split('T')[0],
          end: new Date(event.enddate).toISOString().split('T')[0],
          resourceId: ['a', 'b', 'c', 'd'][data.myplan.indexOf(event) % 4],
        }));
        console.log("events", processedEvents);
        setEvents(processedEvents || []);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

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
        calendarApi.next();
      } else if (touchEndX - touchStartX.current > 50) {
        calendarApi.prev();
      }
    }
  };

  const handleDatesSet = (arg) => {
    //console.log(arg);
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
    //console.log(endDate, startDate, newMonth);

  };

  const handleDayCellClick = (date) => {
    onOpen();
  };

const handleEventDragStop = () => {
  //console.log("timer start");
  setTimeout(() => {
    const daydivs = document.getElementsByClassName("fc-daygrid-day-frame");
    const plandivs = document.getElementsByClassName("fc-daygrid-event-harness");
    //console.log("daydivs", daydivs);
    //console.log("plandivs", plandivs);

    const firstDayDiv = daydivs[0];

    for (let i = 0; i < plandivs.length; i++) {
      //console.log("plandivs[i]", plandivs[i]);
      plandivs[i].addEventListener('click', (event) => {
        const divStartX = plandivs[i].getBoundingClientRect().left;
        const clickX = event.clientX;
        const diffX = clickX - divStartX;
        
        const anchorTag = plandivs[i].querySelector('a');
        //console.log("anchorTag", anchorTag);
        let previousSiblingDiv = plandivs[i].parentElement.previousElementSibling;
        while (previousSiblingDiv && !previousSiblingDiv.querySelector('a')) {
          previousSiblingDiv = previousSiblingDiv.previousElementSibling;
        }
        const previousAnchorTag = previousSiblingDiv ? previousSiblingDiv.querySelector('a') : null;
        //console.log("previousAnchorTag", previousAnchorTag);
        const ariaLabel = previousAnchorTag ? previousAnchorTag.getAttribute('aria-label') : anchorTag.getAttribute('aria-label');
        //console.log("ariaLabel", ariaLabel);
        const [year, month, day] = ariaLabel.match(/(\d+)년 (\d+)월 (\d+)일/).slice(1, 4);
        //console.log("year, month, day", year, month, day);
        const baseDate = new Date(year, month - 1, day);
        //console.log("baseDate", baseDate);

        const dayDivStartX = daydivs[0].getBoundingClientRect().left;
        const dayWidth = daydivs[0].getBoundingClientRect().width;
        //console.log("dayWidth", dayWidth);

        const test = Math.floor(diffX / dayWidth);
        //console.log("test", test);

        //console.log("div 시작점:", divStartX);
        //console.log("클릭된 x좌표:", clickX);
        //console.log("차이값:", diffX);
        const newDate = new Date(baseDate);
        newDate.setDate(newDate.getDate() + test);
        //console.log("새로운 날짜:", newDate);
        setSelectedDate(newDate);
        onOpen();
      });
    }
  }, 0);
};

  const handleEventResizeStop = (info) => {
    setTimeout(() => {
      //console.log('Event resized:', info.event);
      const daydiv = info.el.getElementsByClassName("fc-daygrid-day-frame")[0];
      const plandivs = info.el.getElementsByClassName("fc-daygrid-event-harness");
      //console.log("daydiv", daydiv);
      //console.log("plandivs", plandivs);
      //console.log("이엘", info);

      for (let i = 0; i < plandivs.length; i++) {
        //console.log("plandivs[i]", plandivs[i]);
        plandivs[i].addEventListener('click', (event) => {
          const divStartX = plandivs[i].getBoundingClientRect().left;
          const clickX = event.clientX;
          const diffX = clickX - divStartX;

          const dayDivStartX = daydiv.getBoundingClientRect().left;
          const dayWidth = daydiv.getBoundingClientRect().width;
          //console.log("dayWidth", dayWidth);

          const test = Math.floor(diffX / dayWidth);
          //console.log("test", test);

          //console.log("div 시작점:", divStartX);
          //console.log("클릭된 x좌표:", clickX);
          //console.log("차이값:", diffX);
          const newDate = new Date(info.date);
          newDate.setDate(newDate.getDate() + test);
          //console.log("새로운 날짜:", newDate);
          setSelectedDate(newDate);
          onOpen();
        });
      }
    }, 0);
  };

  const eventstest = [
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

  const handleAddEventClick = () => {
    setIsAddingEvent(true);
    setStartDate(null);
    setEndDate(null);
    setTitle("");
    setDateError(false);
    setIsValid(false);
  };

  const handleSaveEvent = () => {
    if (isValid) {
      //console.log("일정 추가:", { startDate, endDate, title });
      setIsAddingEvent(false);
    }
  };

  const handleModalClose = () => {
    setIsAddingEvent(false);
    onOpenChange(false);
  };

  console.log("events", events);

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
        // initialEvents={events}
        initialEvents={events}
        events={events}
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

            // daydiv에 이벤트를 추가하지만, 이벤트가 plandiv에서 발생하면 무시
            daydiv.addEventListener('click', (event) => {
              if (!event.target.closest(".fc-daygrid-event-harness")) {
                setSelectedDate(info.date);
                onOpen();
              }
            });

            //console.log("daydiv", daydiv);
            //console.log("plandivs", plandivs);
            //console.log("이엘", info);

            for (let i = 0; i < plandivs.length; i++) {
              //console.log("plandivs[i]", plandivs[i]);
              plandivs[i].addEventListener('click', (event) => {
                event.stopPropagation(); // 이벤트 전파 중지
                const divStartX = plandivs[i].getBoundingClientRect().left;
                const clickX = event.clientX;
                const diffX = clickX - divStartX;

                const dayDivStartX = daydiv.getBoundingClientRect().left;
                const dayWidth = daydiv.getBoundingClientRect().width;
                //console.log("dayWidth", dayWidth);

                const test = Math.floor(diffX / dayWidth);
                //console.log("test", test);

                //console.log("div 시작점:", divStartX);
                //console.log("클릭된 x좌표:", clickX);
                //console.log("차이값:", diffX);
                const newDate = new Date(info.date);
                newDate.setDate(newDate.getDate() + test);
                //console.log("새로운 날짜:", newDate);
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
        onOpenChange={handleModalClose}
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
                {isAddingEvent ? (
                  <div className='mt-[60px] flex flex-col'>
                    <div className='flex font-bold text-2xl'>일정을 추가해볼까요?</div>
                    <div className='pt-5'>
                      <div className='pb-5'>
                        <DatePicker 
                          label="시작 날짜" 
                          className="w-full"
                          value={startDate}
                          onChange={setStartDate}
                          isInvalid={dateError}
                        />
                      </div>
                      <div>
                        <DatePicker 
                          label="종료 날짜" 
                          className="w-full"
                          value={endDate}
                          onChange={setEndDate}
                          isInvalid={dateError}
                          errorMessage={dateError ? "종료 날짜는 시작 날짜보다 같거나 늦어야 합니다" : ""}
                        />
                      </div>
                    </div>
                    <div className='pt-5 flex flex-wrap md:flex-nowrap w-full'>
                      <Input 
                        type="text"
                        label="제목" 
                        placeholder="제목을 입력해주세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        isRequired
                      />
                      <Textarea
                        label="내용"
                        placeholder="내용을 입력해주세요."
                        className="w-full pt-5"
                        maxRows="3"
                      />
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col'>
                    <p className='text-sm mb-[10px] font-bold text-[#888888]'>학사일정</p>
                    <Accordion variant="splitted" className='px-0'>
                      {events
                        .filter(event => {
                          const eventStartDate = new Date(event.start);
                          const eventEndDate = new Date(event.end);
                          const selectedDay = selectedDate;
                          return (
                            eventStartDate <= selectedDay &&
                            eventEndDate >= selectedDay
                          );
                        })
                        .map((event, index) => (
                          <AccordionItem
                            classNames={{
                              title: 'font-bold text-xl',
                              content: 'font-bold text-base text-[#888888]',
                            }}
                            key={index}
                            aria-label={`Accordion ${index + 1}`}
                            title={
                              <>
                                <div className='flex flex-row'>
                                  <div className='flex flex-shrink-0 w-1 mr-2 bg-[#ff4d02]'></div>
                                  <div>{event.title}</div>
                                </div>
                              </>
                            }
                          >
                            {event.description}
                          </AccordionItem>
                        ))}
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
                      aria-label="Accordion 3" 
                      title={<>
                        <div className='flex flex-row'>
                        <div className='flex flex-shrink-0 w-1 mr-2 bg-[#ff4d02]'></div>
                          <div>동아리 회의</div>
                        </div>
                      </>}
                      >
                      학과별 재학생 대상 전공능력진단 실시 안내
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {isAddingEvent ? (
                  <Button 
                    className={`w-full text-white ${
                      isValid ? "bg-blue-600" : "bg-gray-400"
                    }`}
                    onClick={handleSaveEvent}
                    isDisabled={!isValid}
                  >
                    일정 추가
                  </Button>
                ) : (
                  <Button onClick={handleAddEventClick} className='w-full text-white'>일정 추가</Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
