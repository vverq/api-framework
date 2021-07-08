import { assert } from 'chai';
import CoreApi from '../src/http/CoreApi';

describe('Проверка функционала добавления котов', async () => {

  it('Получение кота по id', async () => {
    const name = 'Вики';

    const response = await CoreApi.getCatById(101368);

    assert.equal(response.data.cat.name, name, 'Имена не соответствуют');
  });

  it('Поиск существующего кота', async () => {
    const expName = 'Балу';

    const response = await CoreApi.searchCatByPartName(expName);
    if (response.status === 404) {
      assert.fail(`Кот не найден! Response:\n ${JSON.stringify(response.data, null, 2)}`);
    }
    const actName: string = response.data.cats[0].name;

    assert.ok(actName === expName, `Имя [${actName}] не соответствует ожидаемому [${expName}]`);
  });

  it('Проверка статуса ответа при удалении несуществующего кота', async () => {
    const status: number = 404;

    const response = await CoreApi.removeCat(103826);

    assert.ok(response.status === status, `Актуальный статус код ${response.status}, ожидался ${status}`);
  });

  it('Проверка данных о коте', async () => {
    const cat_exp = {
      id: 101368,
      name: 'Вики',
      description: 'Hdijd',
      tags: null,
      gender: 'female',
      likes: 560,
      dislikes: 0,
    };

    const response = await CoreApi.getCatById(101368);

    assert.deepEqual(response.data.cat, cat_exp);
  });
});
