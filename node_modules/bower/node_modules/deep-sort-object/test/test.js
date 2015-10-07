'use strict';

var sortobject = require('../index');
var expect = require('expect.js');

describe('sortobject', function () {
    it('should sort object keys recursively', function () {
        var src,
            out;

        src = {
            'z': 'foo',
            'b': 'bar',
            'a': [
                {
                    'z': 'foo',
                    'b': 'bar'
                }
            ]
        };
        
        out = sortobject(src);

        expect(out).to.eql(src);
        expect(Object.keys(out)).to.eql(['a', 'b', 'z']);
        expect(Object.keys(out.a[0])).to.eql(['b', 'z']);
    });

    it('should use a custom comparator', function () {
        var src,
            out;

        src = {
            'b': 'bar',
            'z': 'foo',
            'a': [
                {
                    'b': 'bar',
                    'z': 'foo'
                }
            ]
        };
        
        out = sortobject(src, function (a, b) {
            var ret = a.localeCompare(b);

            return ret * -1;
        });

        expect(out).to.eql(src);
        expect(Object.keys(out)).to.eql(['z', 'b', 'a']);
        expect(Object.keys(out.a[0])).to.eql(['z', 'b']);
    });

    it('should not mess with other types', function () {
        var src,
            out,
            key;

        function Person() { this.bar = 'foo'; }
        Person.prototype.walk = {};

        src = {
            date: new Date(),
            regExp: /foo/,
            string: 'foo',
            number: 27,
            bool: true,
            constr: Person,
            instance: new Person()
        };


        out = sortobject(src);

        for (key in out) {
            expect(out[key]).to.equal(src[key]);
        }
    });
});

