// import { TestBed } from '@angular/core/testing';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Router } from '@angular/router';
// import { authGuard } from './auth.guard';
// import { UserserviceService } from './userservice.service';

// describe('authGuard', () => {
//   let guard: CanActivate;
//   let userService: UserserviceService;
//   let router: Router;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         authGuard,
//         UserserviceService,
//         Router,
//       ],
//     });

//     guard = TestBed.inject(authGuard);
//     userService = TestBed.inject(UserserviceService);
//     router = TestBed.inject(Router);
//   });

//   it('should be created', () => {
//     expect(guard).toBeTruthy();
//   });

//   it('should allow navigation if the user is logged in', () => {
//     spyOn(userService, 'isUserLoggedIn').and.returnValue(true);

//     const canActivate = guard.canActivate(
//       {} as ActivatedRouteSnapshot,
//       {} as RouterStateSnapshot
//     );

//     expect(canActivate).toBe(true);
//   });

//   it('should redirect to login if the user is not logged in', () => {
//     spyOn(userService, 'isUserLoggedIn').and.returnValue(false);
//     const navigateSpy = spyOn(router, 'navigate');

//     const canActivate = guard.canActivate(
//       {} as ActivatedRouteSnapshot,
//       {} as RouterStateSnapshot
//     );

//     expect(canActivate).toBe(false);
//     expect(navigateSpy).toHaveBeenCalledWith(['/login']);
//   });
// });
