/**
 * @Author Sarah Rehman
 * studentnumber: 500798305
 * front-unit tests
 */

import { SettingsService } from './settings.service';
let service: SettingsService;

  describe('SettingsService', () => {
      beforeEach(() => {
        service = new SettingsService();
      });

    afterEach(() => {
      service = null;
      localStorage.removeItem('token');
    });


    it('should return true from isAuthenticated when there is a token', () => {
      localStorage.setItem('token', '1234');
      expect(service.isAuthenticated()).toBeTruthy();
    });


    it('should return false from isAuthenticated when there is no token', () => {
      expect(service.isAuthenticated()).toBeFalsy();
    });

    });



