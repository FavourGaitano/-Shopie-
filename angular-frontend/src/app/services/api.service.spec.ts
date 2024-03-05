import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { expectedUsers } from './testdata/users';

describe('ApiService', () => {
  let service: ApiService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    testingController = TestBed.inject(HttpTestingController)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('gets all users', ()=>{
    service.getUsers().subscribe((users: any)=>{
      expect(users).toBeTruthy()
      expect(users.length).toBe(3)
    })

    const mockReq = testingController.expectOne('http://localhost:4001/users')
    mockReq.flush(Object.values(expectedUsers))
    expect(mockReq.request.method).toBe('GET')
  })

  it('gets user by id', ()=>{
    let id = '2ac0ab9f-c91e-4376-bd59-a496e46ed202'
    service.getOneUserDetails(id).subscribe((user:any)=>{
      expect(user).toBeTruthy();
      expect(user.name).toBe("Favour")
    })

    const mockReq = testingController.expectOne(`http://localhost:4001/users/${id}`)
    mockReq.flush(expectedUsers[0])
    expect(mockReq.request.method).toBe('GET')
  })

  // it('deletes a user', ()=>{
  //   let id = '2ac0ab9f-c91e-4376-bd59-a496e46ed202'

  //   service.deleteUser(id).subscribe((res:any)=>{
  //     expect(res).toBeTruthy();
  //     expect(res.message).toBe('Deleted successfully')
  //   })

  //   const mockReq = testingController.expectOne(`http://localhost:4001/users/delete/${id}`)
  //   expect(mockReq.request.method).toBe('DELETE')
  // })

  

});
