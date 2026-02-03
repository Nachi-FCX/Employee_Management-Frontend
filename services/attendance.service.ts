export interface AttendancePayload {
  employee_id: number
  company_id: number
  action: 'check_in' | 'check_out'
  timestamp?: string
}

export interface AttendanceResponse {
  success: boolean
  message: string
  data?: {
    id: number
    employee_id: number
    check_in_time?: string
    check_out_time?: string
    date: string
    duration?: string
  }
}

export const useAttendanceService = () => {
  const { $api } = useNuxtApp()

  // CHECK-IN
  const checkIn = (
    employeeId: number,
    companyId: number
  ): Promise<AttendanceResponse> => {
    return $api.post('/api/employees/attendance', {
      employee_id: employeeId,
      company_id: companyId
    })
  }

  // CHECK-OUT
  const checkOut = (
    employeeId: number,
    companyId: number
  ): Promise<AttendanceResponse> => {
    return $api.post('/api/employees/attendance', {
      employee_id: employeeId,
      company_id: companyId
    })
  }

  // GET ATTENDANCE RECORDS
  const getAttendanceRecords = (employeeId: number) => {
    return $api.get(`/api/attendance/${employeeId}`)
  }

  // GET TODAY'S ATTENDANCE
  const getTodayAttendance = (employeeId: number) => {
    return $api.get(`/api/attendance/${employeeId}/today`)
  }

  return {
    checkIn,
    checkOut,
    getAttendanceRecords,
    getTodayAttendance,
  }
}
