import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set
        const parent = TestUtils.renderIntoDocument(<div>
            <ToDoItem text={"test"} id={0} done={false} toggle={() => {}} remove={() => {}} />
        </div>)
	var node = findDOMNode(parent).children[0]
        expect(node.children.length).to.equal(3)
        expect(node.children[1].innerHTML).to.equal("test")
    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'
        const parent = TestUtils.renderIntoDocument(<div>
            <ToDoItem text={"test"} id={0} done={false} toggle={() => {}} remove={() => {}} />
        </div>)
	var node = findDOMNode(parent).children[0]
        expect(node.children.length).to.equal(3)
        for(var child in node.children) {
            expect(child.className).to.not.equal("completed")
        }
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true
        const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem text={"test"} id={0} done={false} toggle={() => { toggled=true }} remove={()=>{}} />
		</div>).children[0]
		TestUtils.Simulate.click(node.children[0])
		expect(toggled).to.equal(true)
    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true
        const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem text={"test"} id={0} done={false} toggle={() => {}} remove={()=>{ removed = true }} />
		</div>).children[0]
		TestUtils.Simulate.click(node.children[2])
		expect(removed).to.equal(true)

    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"
        const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem text={"test"} id={0} done={true} toggle={() => {}} remove={()=>{}} />
		</div>).children[0]
        expect(node.children[1].className).to.equal("completed")
    })

})
