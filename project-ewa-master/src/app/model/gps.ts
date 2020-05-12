export class Gps {
  latitude: number;
  longitude: number;

  /**
   * Saves given coordinates as a Gps coordinate object.
   *
   * @param latitude The gps coordinate's latitude value
   * @param longitude The gps coordinate's longitude value
   */
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
