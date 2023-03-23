export type AccountType =
  /**BS : 자산 */
  | 'assets'
  /**BS : 부채 */
  | 'liabilities'
  /**BS : 자본 */
  | 'equity'
  /**IS : 매출 */
  | 'revenues'
  /**IS : 매출원가 */
  | 'costOfGoodsSold'
  /**IS : 매출총이익 */
  | 'grossProfit'
  /**IS : 판매관리비 */
  | 'operatingExpenses'
  /**IS : 영업외수익 */
  | 'otherRevenuesAndGains'
  /**IS : 영업외비용 */
  | 'otherRevenuesAndLosses'
  /**IS : 법인세 */
  | 'corporateTAX';

// /**IS : 영업이익 */
// | 'operatingProfit '
// /**IS : 법인세차감전이익 */
// | 'earningsBeforeTax'
// /**IS : 당기순이익 */
// | 'netIncome';

export type AccountIsType =
  /**IS : 매출 */
  | 'revenues'
  /**IS : 매출원가 */
  | 'costOfGoodsSold'
  /**IS : 매출총이익 */
  | 'grossProfit'
  /**IS : 판매관리비 */
  | 'operatingExpenses'
  /**IS : 영업외수익 */
  | 'otherRevenuesAndGains'
  /**IS : 영업외비용 */
  | 'otherRevenuesAndLosses'
  /**IS : 법인세 */
  | 'corporateTAX';

export type AccountBsType =
  /**BS : 자산 */
  | 'assets'
  /**BS : 부채 */
  | 'liabilities'
  /**BS : 자본 */
  | 'equity';
