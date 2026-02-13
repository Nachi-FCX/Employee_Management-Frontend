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

  // SINGLE ATTENDANCE API
  const submitAttendance = (
    payload: AttendancePayload
  ): Promise<AttendanceResponse> => {
    return $api.post('/api/attendence/punch', payload)  
  }

  // CHECK-IN
  const checkIn = (
    employeeId: number,
    companyId: number
  ): Promise<AttendanceResponse> => {
    return submitAttendance({
      employee_id: employeeId,
      company_id: companyId,
      action: 'check_in'
    })
  }

  // CHECK-OUT
  const checkOut = (
    employeeId: number,
    companyId: number
  ): Promise<AttendanceResponse> => {
    return submitAttendance({
      employee_id: employeeId,
      company_id: companyId,
      action: 'check_out'
    })
  }

  // GET EMPLOYEE ATTENDANCE RECORDS
  const getAttendanceRecords = () => {
    return $api.get('/api/attendence/logs')     //api/attendance/logs
  }

  // GET TODAY'S ATTENDANCE
  const getTodayAttendance = (employeeId: number) => {
    return $api.post(`/api/attendance`)
  }

  return {
    submitAttendance,
    checkIn,
    checkOut,
    getAttendanceRecords,
    getTodayAttendance,
  }
}
