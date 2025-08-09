# Relief Period Management Flow Guide

## Summary of Changes Made

### 1. Fixed Backend API Integration
- **Updated timetable endpoint**: Changed from relief-period service to timetable service for getting teacher schedules
- **Day of week conversion**: Added proper date to day-of-week conversion (MONDAY, TUESDAY, etc.)
- **Available teachers fallback**: Added fallback to show all teachers if backend endpoint fails

### 2. Enhanced Service Layer
- **ReliefPeriodService updates**:
  - Fixed `getAbsentTeacherTimetable()` to use `/timetable/teacher/{teacherId}/day/{dayOfWeek}`
  - Fixed `getAvailableTeachers()` to use `/timetable/available-teachers`
  - Added `getDayOfWeekFromDate()` helper method
  - Added RxJS map operator for data transformation

### 3. Improved Component Logic
- **Enhanced debugging**: Added comprehensive console logging throughout the workflow
- **Better error handling**: More informative error messages and fallback strategies
- **Teacher name resolution**: Enhanced available teachers with actual names from academic service

### 4. UI/UX Improvements
- **Better progress indicators**: Step 3 and 4 now show even when loading
- **Enhanced debug information**: Real-time feedback on workflow progress
- **Clear error messages**: More specific guidance when issues occur

## Complete Workflow Guide

### Step 1: Mark Teacher Absent
1. Navigate to "Mark Absent" tab
2. Select teacher from dropdown (loaded from academic service)
3. Choose absence date (e.g., August 8, 2025 - Friday)
4. Select reason for absence
5. Click "Mark Absent"

### Step 2: Assign Relief Period
1. Navigate to "Assign Relief" tab
2. **Step 1 - Select Date**: Choose the same date (August 8, 2025)
3. **Step 2 - Select Absent Teacher**: Pick the teacher you marked absent
4. **Step 3 - Teacher's Timetable**: System loads the teacher's Friday schedule
5. **Step 4 - Available Teachers**: Select period → see available relief teachers

## Backend API Endpoints Used

### Relief Period Management
- `POST /relief-period/absence` - Mark teacher absent
- `GET /relief-period/absence/date/{date}` - Get absent teachers for date
- `POST /relief-period/assign` - Assign relief teacher

### Timetable Integration
- `GET /timetable/teacher/{teacherId}/day/{dayOfWeek}` - Get teacher's daily schedule
- `GET /timetable/available-teachers?dayOfWeek={day}&periodNumber={period}` - Get available teachers

### Academic Staff
- `GET /academic-staff` - Get all teachers list

## Data Flow Summary

```
1. Mark Teacher Absent
   ↓
2. Select Date (converts to LocalDate for backend)
   ↓
3. Load Absent Teachers for Date
   ↓
4. Select Absent Teacher
   ↓
5. Load Teacher Timetable (converts date to day-of-week)
   ↓
6. Select Period from Timetable
   ↓
7. Load Available Teachers for Period
   ↓
8. Assign Relief Teacher
   ↓
9. Create Relief Period Record
```

## Debug Information Available

The system now provides real-time debug information:
- Teacher loading status
- Date conversion details
- Timetable loading progress
- Available teachers search results
- Backend API call status

## Testing Checklist

- [ ] Teachers load in "Mark Absent" dropdown
- [ ] Teacher can be marked absent successfully
- [ ] Absent teachers appear in "Assign Relief" section
- [ ] Teacher selection triggers timetable loading
- [ ] Timetable displays correctly for selected day
- [ ] Period selection loads available teachers
- [ ] Relief assignment completes successfully
- [ ] Reports section shows assigned relief periods

## Troubleshooting

### If Step 3 shows "Loading teacher's timetable..." indefinitely:
- Check if teacher has classes scheduled for the selected day
- Verify backend timetable service is running
- Check browser console for API errors

### If Step 4 shows "Loading available teachers..." indefinitely:
- System will fallback to show all teachers except the absent one
- Check if backend available-teachers endpoint is working
- Verify period number is valid

### Backend Requirements:
- Timetable service must be running on the expected endpoints
- Academic staff service must provide teacher data
- Relief period service must handle the date formats correctly
