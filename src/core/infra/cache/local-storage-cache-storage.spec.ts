import { faker } from '@faker-js/faker/locale/pt_BR'

import { LocalStorageCacheStorage } from './local-storage-cache-storage'

import 'jest-localstorage-mock'

const makeSut = () => {
  return new LocalStorageCacheStorage()
}

describe('LocalStorageCacheStorage', () => {
  it('Should return correct object on get() ', () => {
    const key = faker.random.word()
    const fakerObj = {
      [faker.random.word()]: faker.random.words()
    }
    jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(fakerObj))
    const sut = makeSut()

    const response = sut.get(key)

    expect(response).toEqual(fakerObj)
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
  })

  it('Should return undefined on get() if value is null', () => {
    const key = faker.random.word()
    jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(null)
    const sut = makeSut()

    const response = sut.get(key)

    expect(response).toBeUndefined()
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
  })

  it('Should call localStorage.setItem() with correct values', () => {
    const key = faker.random.word()
    const fakerObj = {
      [faker.random.word()]: faker.random.words()
    }
    const sut = makeSut()
    const setItemSpy = jest.spyOn(localStorage, 'setItem')

    sut.set(key, fakerObj)

    expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify(fakerObj))
  })

  it('Should call localStorage.removeItem() if value is null', () => {
    const key = faker.random.word()
    const sut = makeSut()
    const removeItemSpy = jest.spyOn(localStorage, 'removeItem')

    sut.set(key, null)

    expect(removeItemSpy).toHaveBeenCalledWith(key)
  })
})
