import { assert } from 'chai';
import CoreApi from '../src/http/CoreApi';
import { allure } from 'allure-mocha/runtime';


const getRandomInt = (max: number) => Math.floor(Math.random() * max);

describe('Проверка функцинальности удаления кота', async () => {
    it('Удаление случайного кота', async () => {
        const response_all_cats = await CoreApi.getAllCats();
        const group_number = getRandomInt(response_all_cats.data.groups.length);
        const cat_number = getRandomInt(response_all_cats.data.groups[group_number].cats.length);
        const id = response_all_cats.data.groups[group_number].cats[cat_number].id;
        let response = await allure.step(
            `выполнен запрос DELETE /cats/${id}/remove`,
            async () => {
                console.info('Удаление кота по id:', `выполняется запрос DELETE /cats/${id}/remove`);
                const response = await CoreApi.removeCat(id);
                const data = JSON.stringify(response.data, null, 2);
                console.info('Удаление кота по id:', `получен ответ на запрос DELETE /cats/${id}/remove:\n`, data);
                allure.attachment('attachment', data, 'application/json');
                return response;
            }
        );
        response = await allure.step(
            `выполнен запрос GET /get-by-id c параметром ${id}`,
            async () => {
                console.info('Поиск удаленного кота по id:', `выполняется запрос GET /get-by-id c параметром ${id}`);
                const response = await CoreApi.removeCat(id);
                const data = JSON.stringify(response.data, null, 2);
                console.info('Поиск удаленного кота по id:', `получен ответ на запрос GET /get-by-id c параметром ${id}:\n`, data);
                allure.attachment('attachment', data, 'application/json');
                return response;
            }
        );
        await allure.step(
            'выполнена проверка соответствия значения статус кода запроса с ожидаемым',
            () => {
                allure.attachment('expected', '404', 'text/plain');
                allure.attachment('actual', response.status.toString(), 'text/plain');
                console.info(`Запрос на поиск удаленного котика выполнен со статус-кодом ${response.status}`);
                assert.equal(response.status.toString(), '404', 'Статус код запроса не соответсвует');
            }
        );
    });
});