/**
 * Tests for the Tokenizer class.
 */

import chai from 'chai'
import { Grammar } from '../src/Grammar.js'
import { Tokenizer } from '../src/Tokenizer.js'
import { TokenType } from '../src/TokenType.js'

const expect = chai.expect
const ex1Result = [
  {
    type: 'Word',
    value: 'Meningen'
  },
  {
    type: 'Word',
    value: 'består'
  },
  {
    type: 'Word',
    value: 'av'
  },
  {
    type: 'Word',
    value: 'ord'
  },
  {
    type: 'Dot',
    value: '.'
  }]
const ex1ResultString = ex1Result.map((token) => {
  return `\n\t${token.type}('${token.value}')`
})

const ex2Result = [
  {
    type: 'NUMBER',
    value: '3'
  },
  {
    type: 'ADD',
    value: '+'
  },
  {
    type: 'NUMBER',
    value: '2'
  }]
const ex2ResultString = ex2Result.map((token) => {
  return `\n\t${token.type}('${token.value}')`
})

const ex3Result = [
  {
    type: 'FLOAT',
    value: '3.14'
  },
  {
    type: 'INTEGER',
    value: '5'
  }]
const ex3ResultString = ex3Result.map((token) => {
  return `\n\t${token.type}('${token.value}')`
})

describe('Example 1 - wordAndDotGrammar', () => {
  describe('return value', () => {
    it(`'Meningen består av ord' should return ${ex1ResultString}`, () => {
      const word = new TokenType('Word', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('Dot', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'Meningen består av ord.')
      textTokenizer.tokenize()
      expect(textTokenizer.getTokens()).to.eql(ex1Result)
    })
  })
})

describe('Example 2 - arithmeticGrammar', () => {
  describe('return value', () => {
    it(`'3 + 2' should return ${ex2ResultString}`, () => {
      const number = new TokenType('NUMBER', /^[0-9]+(\.([0-9])+)?/)
      const add = new TokenType('ADD', /^[+]/)
      const mul = new TokenType('MUL', /^[*]/)
      const arithmeticGrammar = new Grammar()
      arithmeticGrammar.addTokenType(number)
      arithmeticGrammar.addTokenType(add)
      arithmeticGrammar.addTokenType(mul)

      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3 + 2')

      arithmeticTokenizer.tokenize()

      expect(arithmeticTokenizer.getTokens()).to.eql(ex2Result)
    })
  })
})

describe('Example 3 - maximalMunchGrammar', () => {
  describe('return value', () => {
    it(`'3.14 5' should return ${ex3ResultString}`, () => {
      const float = new TokenType('FLOAT', /^[0-9]+\.[0-9]+/)
      const integer = new TokenType('INTEGER', /^[0-9]+/)

      const maximalMunchGrammar = new Grammar()

      maximalMunchGrammar.addTokenType(float)
      maximalMunchGrammar.addTokenType(integer)

      const maximalMunchTokenizer = new Tokenizer(maximalMunchGrammar, '3.14 5')

      maximalMunchTokenizer.tokenize()
      maximalMunchTokenizer.getTokens()
      expect(maximalMunchTokenizer.getTokens()).to.eql(ex3Result)
    })
  })
})
