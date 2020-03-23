import { Milestone } from '@models'
import { MilestoneService } from '@services';

const makeid = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe.only('Add new milestone', () => {
  const route = new Milestone(makeid(20), 'Esto es una prueba', 'Descripcion', 5, 10, 10, 11);

  MilestoneService.default = jest.fn();

  test('should add sucessfully', async () => {
    MilestoneService.add('soy_una_ruta', route).then(res => {
      expect(res).toBeTruthy();
    });
  });

  test('should return false because file has been created', () => {
    MilestoneService.add('soy_una_ruta', route).then(res => {
      expect(res).toBeTruthy();
    });
  });
  
});

describe.only('Remove milestone', () => {
  test('should remove sucessfully', async () => {
    MilestoneService.remove('aaaa').then(res => {
      expect(res).toBe(true);
    });
  });

  test('should return undefined', () => {
    MilestoneService.remove('aaa').then(res => {
      expect(res).toBe(false);
    });
  });
  
});

describe.only('Link milestone', () => {
  test('should link sucessfully', async () => {
    MilestoneService.link('soy_una_ruta', 'soy_un_milestone').then(res => {
      expect(res).toBe(true);
    });
  });
  
});

describe.only('Get milestone', () => {
  test('should get sucessfully', async () => {
    MilestoneService.get('soy_un_milestone').then(res => {
      expect(res).toBeTruthy();
    });
  });

  test('should return undefined', () => {
    MilestoneService.get('').then(res => {
      expect(res).toBe(undefined);
    });
  });
  
});

describe.only('Get all milestones', () => {
  test('should get sucessfully', async () => {
    MilestoneService.getAll().then(res => {
      expect(res).toBeTruthy();
    });
  });

  test('should return undefined', () => {
    MilestoneService.getAll(false).then(res => {
      expect(res).toBe(undefined);
    });
  });
  
});