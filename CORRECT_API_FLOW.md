# Relief Period Management - Correct API Flow Implementation

## Updated API Flow

The system now follows the exact flow you specified:

### Step 1: Get Teacher's Timetable
**Endpoint:** `GET /timetable/teacher/{teacherId}/day/{dayOfWeek}`
**Example:** `GET http://localhost:9099/timetable/teacher/1/day/friday`

**Response Format:**
```json
[
    {
        "id": 3,
        "teacherId": "1",
        "teacherName": "Ravindu Iddamalgoda",
        "dayOfWeek": "Friday",
        "periodNumber": 1,
        "startTime": [8, 0],
        "endTime": [8, 40],
        "subject": "Mathematics",
        "grade": "Grade 7",
        "classRoom": "A",
        "academicYear": "2025",
        "term": "Term 1",
        "status": 1
    }
]
```

### Step 2: Get Available Teachers for Selected Period
**Endpoint:** `GET /timetable/available-teachers?dayOfWeek={day}&periodNumber={period}`
**Example:** `GET http://localhost:9099/timetable/available-teachers?dayOfWeek=friday&periodNumber=1`

### Step 3: Assign Relief Teacher
**Endpoint:** `POST /relief-period/assign`
**Example:** `POST http://localhost:9099/relief-period/assign`

## Frontend Implementation Changes

### 1. Service Layer Updates (`relief-period.service.ts`)

**getAbsentTeacherTimetable():**
- Uses `/timetable/teacher/{teacherId}/day/{dayOfWeek}`
- Converts date to lowercase day name (e.g., "friday")
- Handles backend time format `[8, 0]` → `"08:00"`

**getAvailableTeachers():**
- Uses `/timetable/available-teachers` with dayOfWeek parameter
- Converts teacher ID strings to AvailableTeacherDto objects

### 2. Component Updates (`relief-period-management.component.ts`)

**formatTime() method:**
- Handles array format `[8, 0]` from backend
- Converts to display format `"08:00"`

**Enhanced debugging:**
- Shows exact API URLs being called
- Displays day-of-week conversion
- Comprehensive error logging

### 3. Interface Updates

**TimetableDto:**
- Updated to match backend response
- `startTime` and `endTime` can be `string | number[]`
- Added optional `status` field

## Complete Workflow

### Frontend Flow:
1. **Mark Teacher Absent** (Relief Period Controller)
2. **Select Date** → Convert to day-of-week
3. **Get Teacher Timetable** (Timetable Controller)
4. **Select Period** → Get available teachers (Timetable Controller)
5. **Assign Relief** (Relief Period Controller)

### API Calls Sequence:
```
1. POST /relief-period/absence
2. GET /relief-period/absence/date/2025-08-08
3. GET /timetable/teacher/1/day/friday
4. GET /timetable/available-teachers?dayOfWeek=friday&periodNumber=1
5. POST /relief-period/assign
```

## Testing Instructions

1. **Mark Ravindu Absent:**
   - Teacher ID: 1
   - Date: August 8, 2025 (Friday)

2. **Assign Relief:**
   - Select same date
   - Select Ravindu (ID: 1)
   - System will call: `GET /timetable/teacher/1/day/friday`
   - Should display Period 1: Mathematics, Grade 7, A (08:00-08:40)

3. **Select Period 1:**
   - System will call: `GET /timetable/available-teachers?dayOfWeek=friday&periodNumber=1`
   - Should show list of available teachers

4. **Assign Relief Teacher:**
   - Select available teacher
   - System will call: `POST /relief-period/assign`

## Debug Information

Open browser console to see:
- Exact API URLs: `/timetable/teacher/1/day/friday`
- Day conversion: `2025-08-08` → `friday`
- Time formatting: `[8, 0]` → `08:00`
- Response data from each endpoint

The system now correctly follows your specified API flow!
