export type ActionType =
  /**VC에서 스타트업으로 자료요청 */
  | 'Request:InvesteeReport:InvestorToInvestee'
  /**요청자료 전송 */
  | 'Reply:InvesteeReport:InvesteeToInvestor';
