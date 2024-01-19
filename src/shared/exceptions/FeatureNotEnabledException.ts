class FeatureNotEnabledException extends Error {
  constructor(message: string = 'Feature not enabled for this tenant. Contact support.') {
    super(message);
    this.name = 'FeatureNotEnabledException';
  }
}
export default FeatureNotEnabledException;
