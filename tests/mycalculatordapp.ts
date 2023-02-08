const assert = require('assert');
const anchor = require('@project-serum/anchor');
const {SystemProgram} = anchor.web3

describe('my calculator app', () => {
    const provider = anchor.AnchorProvider.local();
    anchor.setProvider(provider);
    const calculator = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Mycalculatordapp

    it('Create a calculator', async () => {
        await program.rpc.create('welcome to solana', {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator]
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.greeting === "welcome to solana")
    })

    it('Adds two numbers', async() => {
        await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(5)))
    })

    it('Subtract two numbers', async() => {
        await program.rpc.sub(new anchor.BN(15), new anchor.BN(5), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(10)))
    })

    it('Multiplicate two numbers', async() => {
        await program.rpc.mult(new anchor.BN(5), new anchor.BN(5), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(25)))
    })

    it('Divides two numbers', async() => {
        await program.rpc.div(new anchor.BN(10), new anchor.BN(2), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(
            calculator.publicKey
        );
        assert.ok(account.result.eq(new anchor.BN(5)));
        assert.ok(account.remainder.eq(new anchor.BN(0)));
        
    })
})